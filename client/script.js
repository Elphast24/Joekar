async function showAdd() {
    console.log("Clicked");
  
    const addMenuEl = document.getElementById('addItem');
    const menuEl = document.getElementById('contain');
  
    const addMenus = window.getComputedStyle(addMenuEl).display;
    const menu = window.getComputedStyle(menuEl).display;
  
    console.log(menu, addMenu);
    
    if (menu === 'none' && addMenu === 'none') {
      menuEl.style.display = 'block';
      addMenuEl.style.display = 'block';
      console.log("Both elements are now visible");
    }
  }

async function closeMenu(){
    const containEl = document.getElementById('contain')
    const addItemEl = document.getElementById('addItem');
    const recordPurchaseEl = document.getElementById('recordPurchase');
    const checkInventoryEl = document.getElementById('checkInventory');
    const makeSalesEl = document.getElementById('makeSales')

    const contain = window.getComputedStyle(containEl).display;
    const addItem = window.getComputedStyle(addItemEl).display;
    const checkInventory = window.getComputedStyle(checkInventoryEl).display;
    const recordPurchase = window.getComputedStyle(recordPurchaseEl).display;
    const makeSales = window.getComputedStyle(makeSalesEl).display;

    if (contain || addItem || checkInventory || recordPurchase || makeSales === 'block') {
        containEl.style.display = 'none';
        addItemEl.style.display = 'none'
        checkInventoryEl.style.display = 'none'
        recordPurchaseEl.style.display = 'none'
        makeSalesEl.style.display = 'none'
    }
}  

async function showRecord() {
    console.log("Clicked");
  
    const showRecordEl = document.getElementById('recordPurchase');
    const menuEl = document.getElementById('contain');
  
    const addMenu = window.getComputedStyle(showRecordEl).display;
    const menu = window.getComputedStyle(menuEl).display;
  
    console.log(menu, addMenu);
    
    if (menu === 'none' && addMenu === 'none') {
      menuEl.style.display = 'block';
      showRecordEl.style.display = 'block';
      console.log("Both elements are now visible");
    }
  }


  async function showInventory() {
    console.log("Clicked");
  
    const checkInventoryEl = document.getElementById('checkInventory');
    const menuEl = document.getElementById('contain');
  
    const addMenu = window.getComputedStyle(checkInventoryEl).display;
    const menu = window.getComputedStyle(menuEl).display;
  
    console.log(menu, addMenu);
    
    if (menu === 'none' && addMenu === 'none') {
      menuEl.style.display = 'block';
      checkInventoryEl.style.display = 'block';
      console.log("Both elements are now visible");
    }
  }

  async function showSales() {
    console.log("Clicked");
  
    const makeSalesEl = document.getElementById('makeSales');
    const salesEl = document.getElementById('contain');
  
    const makeSales = window.getComputedStyle(makeSalesEl).display;
    const sales = window.getComputedStyle(salesEl).display;
  
    console.log(sales, makeSales);
    
    if (sales === 'none' && makeSales === 'none') {
      salesEl.style.display = 'block';
      makeSalesEl.style.display = 'block';
      console.log("Both elements are now visible");
    }else{
      salesEl.style.display = 'none';
      makeSalesEl.style.display = 'none';
    }
  }