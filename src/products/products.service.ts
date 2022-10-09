import { Injectable, NotFoundException } from '@nestjs/common';
import { lchmodSync } from 'fs';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  getAllProducts() {
    return [...this.products];
  }

  getProductById(prodId) {
    const product = this.findProduct(prodId);
    return { ...product };
  }

  updateOneProduct(prodId, title, description, price) {
    const [product, index] = this.findProduct(prodId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteOneProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return [product, productIndex];
  }
}
