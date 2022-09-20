const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');

describe("Test the get users route", () => {
  test("Database is not empty", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    console.log(JSON.parse(response.text).length)
    expect(JSON.parse(response.text).length).toBeGreaterThan(0);
  });
  

});