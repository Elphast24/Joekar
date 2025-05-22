const express = require('express');
const fs = require('fs');
const path = require('path');
const Item = require('../models/itemModel');
const Purchase = require('../models/purchaseModel');

// exports.homepage = async (req, res) => {
//   try {
//     const purchases = await Purchase.find().populate('item'); // populate item reference
//     const rowTemplatePath = path.join(__dirname, '../../client/rowTemplate.html');
//     const rowTemplate = await fs.promises.readFile(rowTemplatePath, 'utf-8');

//     let allRows = '';
//     let counter = 1;

//     purchases.forEach(purchase => {
//       const item = purchase.item;
//       if (!item) return;

//       const totalAmount = item.price * purchase.quantity;
//       const remainingStock = item.stock - purchase.quantity;

//       const statusClass = remainingStock === 0
//         ? 'status-out'
//         : remainingStock <= 5
//           ? 'status-low'
//           : 'status-in-stock';

//       const row = rowTemplate
//         .replace(/{{%id%}}/g, counter++)
//         .replace(/{{%itemName%}}/g, item.name)
//         .replace(/{{%quantity%}}/g, purchase.quantity)
//         .replace(/{{%unitPrice%}}/g, item.price.toFixed(2))
//         .replace(/{{%totalAmount%}}/g, totalAmount.toFixed(2))
//         .replace(/{{%remainingStock%}}/g, remainingStock)
//         .replace(/{{%statusClass%}}/g, statusClass);

//       allRows += row;
//     });

//     const homePagePath = path.join(__dirname, '../../client/home.html');
//     let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');

//     const finalHtml = homeHtml.replace(/{{%Rows%}}/g, allRows);
//     res.send(finalHtml);

//   } catch (error) {
//     console.error('Error loading homepage:', error);
//     res.status(500).send('Something went wrong');
//   }
// };

exports.homepage = async (req, res) => {
  try {
    const items = await Item.find();

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

    const homePagePath = path.join(__dirname, '../../client/home.html');
    let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');

    const finalHtml = homeHtml.replace(/{{%Rows%}}/g, allRows);
    res.send(finalHtml);

  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Something went wrong');
  }
};


// exports.salesHomepage = async (req, res) => {
//   try {
//     const purchases = await Purchase.find().sort({ purchaseDate: -1 });

//     const rowTemplatePath = path.join(__dirname, '../../client/salesRow.html');
//     const rowTemplate = await fs.promises.readFile(rowTemplatePath, 'utf-8');

//     let salesRows = '';
//     let counter = 1;

//     purchases.forEach(purchase => {
//       const row = rowTemplate
//         .replace(/{{%id%}}/g, counter++)
//         .replace(/{{%itemName%}}/g, purchase.itemName)
//         .replace(/{{%unitPrice%}}/g, purchase.unitPrice?.toFixed(2) || '0.00')
//         .replace(/{{%quantity%}}/g, purchase.quantity)
//         .replace(/{{%totalAmount%}}/g, purchase.totalAmount?.toFixed(2) || '0.00')
//         .replace(/{{%remaining%}}/g, purchase.remaining ?? 'N/A');

//       salesRows += row;
//     });

//     const homePagePath = path.join(__dirname, '../../client/home.html');
//     let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');

//     const finalHtml = homeHtml.replace(/{{%SalesRow%}}/g, salesRows);
//     res.send(finalHtml);
//   } catch (error) {
//     console.error('Error loading homepage:', error);
//     res.status(500).send('Something went wrong');
//   }
// };


  exports.createItem = async (req, res) => {
    const { name, price, stock } = req.body;
  
    try {
      const newItem = new Item({ name, price, stock });
      await newItem.save();
  
      console.log('Item added successfully.');
      // ✅ Redirect to a success page or back to the form page
      const homePagePath = path.join(__dirname, '../../client/home.html');
      let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');
      res.redirect('/api'); // change this to your actual page
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).send('Failed to add item.');
    }
  };

  