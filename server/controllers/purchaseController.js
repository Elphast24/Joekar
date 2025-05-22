const Item = require('../models/itemModel');
const Purchase = require('../models/purchaseModel');
const fs = require('fs');
const path = require('path');

exports.createPurchase = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;

    // Find the item by name
    const item = await Item.findOne({ name: itemName });

    if (!item) {
      return res.status(404).json({ error: `Item '${itemName}' not found in inventory.` });
    }

    // Check if enough stock is available
    if (item.stock < quantity) {
      return res.status(400).json({ error: `Only ${item.stock} units of '${itemName}' available.` });
    }

    // Update stock
    item.stock -= quantity;

    let deletionMessage = '';
    if (item.stock === 0) {
      await Item.deleteOne({ _id: item._id });
      deletionMessage = `Item '${itemName}' deleted as stock reached zero.`;
    } else {
      await item.save();
    }

    // Create the purchase
    const totalAmount = item.price * quantity;
    const newPurchase = new Purchase({
      itemName,
      quantity,
      unitPrice: item.price,
      totalAmount,
      remaining: item.stock
    });

    await newPurchase.save();

    res.status(201).json({
      message: 'Purchase successful',
      purchase: newPurchase,
      ...(deletionMessage && { deleted: deletionMessage })
    });

  } catch (err) {
    console.error('Error creating purchase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// exports.showSales = async (req, res) => {
//   try {
//     const purchases = await Purchase.find().sort({ purchaseDate: -1 }); // latest first

//     const rowTemplatePath = path.join(__dirname, '../../client/salesRowTemplate.html');
//     const rowTemplate = await fs.promises.readFile(rowTemplatePath, 'utf-8');

//     let allRows = '';
//     let counter = 1;

//     purchases.forEach(purchase => {
//       const row = rowTemplate
//         .replace(/{{%id%}}/g, counter++)
//         .replace(/{{%itemName%}}/g, purchase.itemName)
//         .replace(/{{%unitPrice%}}/g, purchase.unitPrice?.toFixed(2) || '0.00')
//         .replace(/{{%quantity%}}/g, purchase.quantity)
//         .replace(/{{%totalAmount%}}/g, purchase.totalAmount?.toFixed(2) || '0.00')
//         .replace(/{{%remaining%}}/g, purchase.remaining ?? 'N/A');

//       allRows += row;
//     });

//     const salesPagePath = path.join(__dirname, '../../client/sales.html');
//     let salesHtml = await fs.promises.readFile(salesPagePath, 'utf-8');

//     const finalHtml = salesHtml.replace(/{{%SalesRow%}}/g, allRows);
//     res.send(finalHtml);

//   } catch (err) {
//     console.error('Error loading sales page:', err);
//     res.status(500).send('Error loading sales page');
//   }
// };


// const fs = require('fs');
// const path = require('path');
// const Purchase = require('../models/purchaseModel'); // adjust path as needed

exports.salesHomepage = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ purchaseDate: -1 });
    console.log('Purchases:', purchases);

    const rowTemplatePath = path.join(__dirname, '../../client/salesRow.html');
    const rowTemplate = await fs.promises.readFile(rowTemplatePath, 'utf-8');

    let salesRows = '';
    let counter = 1;

    purchases.forEach(purchase => {
      const row = rowTemplate
        .replace(/{{%ID%}}/g, counter++)
        .replace(/{{%Name%}}/g, purchase.itemName)
        .replace(/{{%Price%}}/g, purchase.unitPrice?.toFixed(2) || '0.00')
        .replace(/{{%Quantity%}}/g, purchase.quantity)
        .replace(/{{%TotalAmount%}}/g, purchase.totalAmount?.toFixed(2) || '0.00')
        .replace(/{{%Remaining%}}/g, purchase.remaining ?? 'N/A');

      salesRows += row;
    });

    const homePagePath = path.join(__dirname, '../../client/home.html');
    let homeHtml = await fs.promises.readFile(homePagePath, 'utf-8');

    const finalHtml = homeHtml.replace(/{{%SalesRow%}}/g, salesRows);
    res.send(finalHtml);
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Something went wrong');
  }
};
