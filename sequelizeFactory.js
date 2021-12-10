const { Sequelize } = require('sequelize');
const SystemSettings = require('./config/settings');

class SequelizeFactory {
  constructor() {
    /**
     * Connection to database
     */
    this.connection = null;
  }

  /**
   * Establish connection to database
   */
  connect() {
    try {
      this.connection = new Sequelize(
        SystemSettings.databaseName,
        SystemSettings.username,
        SystemSettings.password,
        SystemSettings
      );

      return this.connection;
    } catch (err) {
      console.error(':::: Failed to connect to the database ::::', err);
      return {};
    }
  }

  /**
   * Check if the connection is alive
   */
  async checkConnection() {
    try {
      return this.connection ? await this.connection.authenticate() : false;
    } catch (error) {
      console.error(':::: Connection is not alive ::::', error.message);
      return false;
    }
  }

  /**
   * Return existing connection or establish a new one
   */
  async getConnection() {
    const isConnected = await this.checkConnection();
    return isConnected !== false ? this.connection : this.connect();
  }
}

module.exports = new SequelizeFactory();
