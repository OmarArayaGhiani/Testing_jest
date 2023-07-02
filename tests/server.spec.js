const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD de cafes", () => {
  it("Status 200 en GET/cafes", async () => {
    const response = await request(server).get("/cafes").send()
    const status = response.statusCode
    expect(status).toBe(200)
  })

  it("Data en GET/cafes no es un arreglo vacio", async () => {
    const {body: data} = await request(server).get("/cafes").send()
    expect(data).toBeInstanceOf(Array)
    expect(data.length).not.toBe(0)
  })

  it("Status 404 en DELETE al borrar id inexistente", async () => {
    const id = Math.floor(Math.random() * 999)
    const jwt = "token"
    const response = await request(server)
      .delete(`/cafes/${id}`)
      .set("Authorization", jwt)
      .send()
    const status = response.statusCode
    expect(status).toBe(404)
  })

  it("Status 201 en POST al agregar nuevo", async () => {
    const nuevoCafe = {id: -1, nombre: "Nuevo café"}
    const response = await request(server).post("/cafes").send(nuevoCafe)
    const status = response.statusCode
    const {body: data} = response
    console.log(data.length)
    expect(status).toBe(201)
    expect(data).toContainEqual(nuevoCafe)
  })

  it("Status 400 en PUT al actualizar con id erroneo", async() => {
    const nuevoCafe = {id: -1, nombre: "Nuevo café"}
    const id = "id"
    const response = await request(server).put(`/cafes/${id}`).send(nuevoCafe)
    const status = response.statusCode
    expect(status).toBe(400)
  })
})
