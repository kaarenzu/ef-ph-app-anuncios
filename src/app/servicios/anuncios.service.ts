import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Anuncio } from '../modelo/anuncio';
@Injectable({
  providedIn: 'root'
})

// En este componente tendremos todas las funciones para conectar con la base de datos
export class AnunciosService {

  // Creamos una nueva conexión con sqlite
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection;
  plataforma: string = ""

  // Declaro las variavles que utilizaremos para las configuraciones de la db
  DB_NAME: string = "lista_anuncios";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "lista_anuncios";
  COL_TITULO: string = "titulo";
  COL_FOTOGRAGIA: string = "fotografia";
  COL_DESCRIPCION: string = "descripcion"
  COL_FECHA: string = "fecha" // Dudas con la fecha
  // Query para crear la tabla que utlizaremos
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS  ${this.TABLE_NAME}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_TITULO} TEXT NOT NULL,
      ${this.COL_DESCRIPCION} TEXT NOT NULL,
      ${this.COL_FOTOGRAGIA} TEXT NOT NULL,
      ${this.COL_FECHA} TEXT NOT NULL
    );
  `;

  constructor() { }

  private async _iniciarPluginWeb(): Promise<void> {
    // Este codigo espera la inserción 
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore()
    }
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform()
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
    //await this.delete()
    //await this.agregarAnuncio({ titulo: "Mascota perdida", descripcion: "se perdio en Coquimbo", fecha: new Date().toLocaleString(), fotografia: "" })
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency()
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }


  // Aqui agregaremos los métodos que tendrá este servicio
  // Metodo que nos traerá todos los anuncios 
  async getAnuncios(): Promise<Anuncio[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    return resultado?.values ?? []
  }

  // metodo para eliminar todos los reguistros de la tabla
  async delete(): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    console.log("eliminar")

  }

  // Agregar una cita a la db
  async agregarAnuncio(a: Anuncio): Promise<void> {

    console.log("anuncio recibido para crear", a)
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_TITULO}, ${this.COL_DESCRIPCION}, ${this.COL_FOTOGRAGIA}, ${this.COL_FECHA}) VALUES(?, ?,?,?)`
    await this.db.run(sql, [a.titulo, a.descripcion, a.fotografia, a.fecha])

  }



}
