import React from 'react';
export class User {
    name: string;
    userId: string;
    dateOfBirth: number;
    address: string;
    unitId: string;
    constructor(name: string, userId: string, dateOfBirth: number, address: string, unitId: string) {
        this.name = name
        this.userId = userId
        this.unitId = unitId
        this.dateOfBirth = dateOfBirth
        this.address = address
    }
}