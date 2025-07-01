const Product = require('../Models/product.model');



// obtener todos los productos
async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).send({
            ok: true,
            message: "Productos encontrados",
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener los productos"
        });
    }
}

// obtener un producto por ID
async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto encontrado",
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener el producto"
        });
    }
}

// crear producto
async function createProduct(req, res) {
    try {

        const product = new Product(req.body)

        if (req.file?.filename) {
            product.image = req.file.filename;
        }

        const newProduct = await product.save()
        
        res.status(201).send({
            ok: true,
            message: "Producto creado",
            newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            ok: false,
            message: "Error al crear el producto"
        });
    }
}

// actualizar un producto existente
async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto actualizado",
            updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto"
        });
    }
}

// rliminar un producto
async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto eliminado"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            ok: false,
            message: "Error al eliminar el producto"
        });
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
