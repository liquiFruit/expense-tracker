beforeEach(() => jest.resetModules())

describe("deleteExpense", () => {
  it("should fail if user is unauthed", async () => {
    jest.mock("../../db", () => ({
      db: {},
    }))
    jest.mock("../../auth/utils", () => ({
      getUserAuth: jest.fn().mockImplementation(async () => ({
        session: null,
      })),
    }))

    const { deleteExpense } = require("./mutations")
    expect(await deleteExpense(0)).toEqual({ error: "Unauthorized" })
  })

  it("should fail if user does not own the provided expense", async () => {
    jest.mock("../../auth/utils", () => ({
      getUserAuth: jest.fn().mockImplementation(async () => ({
        session: {
          user: {
            id: "mocked_user_id",
          },
        },
      })),
    }))

    jest.mock("../../db", () => ({
      db: {
        query: {
          expenses: {
            findFirst: jest.fn(() => undefined),
          },
        },
      },
    }))

    const { deleteExpense } = require("./mutations")
    const { db } = require("../../db")

    expect(await deleteExpense(1)).toEqual({
      error: "You are not authorised to mutate this expense",
    })
  })
})
