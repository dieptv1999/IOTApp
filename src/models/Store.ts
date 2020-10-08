import React from 'react';
export class Store {
    name: string;
    nameOfFood: string;
    address: string;
    imageUrl: string;
    constructor(name: string, address: string, nameOfFood: string, imageUrl: string) {
        this.name = name
        this.address = address
        this.nameOfFood = nameOfFood
        this.imageUrl = imageUrl
    }
}