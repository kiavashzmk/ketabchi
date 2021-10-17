function fetchProductById(itemCode, stockProducts) {
  const product = stockProducts.find((product) => product.code === itemCode);
  return product;
}

//------**************Kasri***************------//
function kasri(orders, stockProducts) {
  const kasri = [];
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const stockProduct = fetchProductById(item.productCode, stockProducts);
      if (stockProduct.stockCount < item.quantity) {
        missingProduct = fetchProductById(item.productCode, kasri);
        missingProduct
          ? (missingProduct.stockCount += item.quantity)
          : kasri.push({
              code: stockProduct.code,
              price: stockProduct.price,
              stockCount: item.quantity - stockProduct.stockCount,
            });
      } else {
        stockProduct.stockCount -= item.quantity;
      }
    });
  });
  return kasri;
}

//------**************ReadyOrders_1***************------//
// V01
function readyOrders(allOrders, stockProducts) {
  const fullfiled = [];
  allOrders.forEach((order) => {
    // Deep copying the stock.
    const _stock = JSON.parse(JSON.stringify(stockProducts));
    let availabeItems = 0;
    order.items.forEach((item) => {
      const stockProduct = fetchProductById(item.productCode, _stock);
      if (stockProduct.stockCount >= item.quantity) {
        stockProduct.stockCount -= item.quantity;
        availabeItems += 1;
      }
    });
    if (availabeItems === order.items.length) {
      console.log();
      fullfiled.push(order);
      // updating the stock.
      stockProducts = _stock;
    }
  });
  return { orders: fullfiled, products: stockProducts };
}

//------**************ReadyOrders_2***************------//
// V02, without coyping the stock.
function _readyOrders(allOrders, stockProducts) {
  const fullfiled = [];
  allOrders.forEach((order) => {
    let availabeItems = 0;
    order.items.forEach((item) => {
      const stockProduct = fetchProductById(item.productCode, stockProducts);
      if (stockProduct.stockCount >= item.quantity) {
        availabeItems += 1;
      }
    });
    if (availabeItems === order.items.length) {
      console.log();
      fullfiled.push(order);
      order.items.forEach((item) => {
        const stockProduct = fetchProductById(item.productCode, stockProducts);
        stockProduct.stockCount -= item.quantity;
      });
    }
  });
  return { orders: fullfiled, products: stockProducts };
}

//------**************DATA***************------//
const products = [
  { code: '101', price: 1000, stockCount: 1 },
  { code: '102', price: 1000, stockCount: 2 },
];

const orders = [
  {
    code: '10001',
    bill: 1000,
    items: [{ productCode: '101', quantity: 1 }],
  },
  {
    code: '10002',
    bill: 1000,
    items: [
      { productCode: '101', quantity: 2 },
      { productCode: '102', quantity: 1 },
    ],
  },
];


