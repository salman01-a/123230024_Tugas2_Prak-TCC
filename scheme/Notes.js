const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notes = sequelize.define("Notes", {
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull:false
      }, 
},{
    timestamps: true, 
    createdAt: 'tanggal_dibuat', 
    updatedAt: 'tanggal_diubah'
})

module.exports = Notes;