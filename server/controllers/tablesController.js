const Item = require('../models/itemModel');
const Purchase = require('../models/purchaseModel')
const fs = require('fs')
const path = require('path')

exports.homepage = async (req, res) => {
    try {
      const items = await Item.find();
      const purchases = await Purchase.find().sort({ purchaseDate: -1 });
  
      // Inventory table rows
      const rowTemplatePath = path.join(__dirname, '../../client/rowTemplate.html');
      const rowTemplate = await fs.promises.readFile(rowTemplatePath, 'utf-8');
  
      let allRows = '';
      let counter = 1;
  
      items.forEach(item => {
        const statusClass = item.stock === 0
          ? 'status-out'
          : item.stock <= 5
            ? 'status-low'
            : 'status-in-stock';
  
        const row = rowTemplate
          .replace(/{{%id%}}/g, counter++)
          .replace(/{{%itemName%}}/g, item.name)
          .replace(/{{%unitPrice%}}/g, item.price.toFixed(2))
          .replace(/{{%stock%}}/g, item.stock)
          .replace(/{{%statusClass%}}/g, statusClass);
  
        allRows += row;
      });
  
      // Sales table rows
      const salesRowTemplatePath = path.join(__dirname, '../../client/salesRow.html');
      const salesRowTemplate = await fs.promises.readFile(salesRowTemplatePath, 'utf-8');
  
      let salesRows = '';
      let salesCounter = 1;
  
      purchases.forEach(purchase => {
        const row = salesRowTemplate
          .replace(/{{%ID%}}/g, salesCounter++)
          .replace(/{{%Name%}}/g, purchase.itemName)
          .replace(/{{%Price%}}/g, purchase.unitPrice?.toFixed(2) || '0.00')
          .replace(/{{%Quantity%}}/g, purchase.quantity)
          .replace(/{{%TotalAmount%}}/g, purchase.totalAmount?.toFixed(2) || '0.00')
          .replace(/{{%Remaining%}}/g, purchase.remaining ?? 'N/A');
  
        salesRows += row;
      });
  
      // Load HTML and inject both tables
      const homePagePath = path.join(__dirname, '../../client/home.html');
      let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');
  
      const finalHtml = homeHtml
        .replace(/{{%Rows%}}/g, allRows)
        .replace(/{{%SalesRow%}}/g, salesRows);
  
      res.send(finalHtml);
  
    } catch (error) {
      console.error('Error loading homepage:', error);
      res.status(500).send('Something went wrong');
    }
  };
  