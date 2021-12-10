module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'trades',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tradeType: {
        type: DataTypes.STRING,
        field: 'trade_type',
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
