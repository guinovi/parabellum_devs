const PRODUCTOS = ["harina", "sal", "azúcar", "leche" ]


const getProductos = (req, res) => {
    res.json(PRODUCTOS);
}











export {getProductos};