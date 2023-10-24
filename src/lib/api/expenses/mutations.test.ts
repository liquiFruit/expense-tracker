import { deleteExpense } from "./mutations"

jest.mock("../../db", () => ({
  db: {
    select: jest.fn().mockImplementation(() => ({
      from: (_: any) => ["Personal", "Other"],
    })),
  },
}))

jest.mock("../../auth/utils", () => ({
  getUserAuth: jest.fn().mockImplementation(async () => ({
    session: null,
  })),
}))

describe("deleteExpense", () => {
  it("should fail if user is unauthed", async () => {
    expect(await deleteExpense(0)).toEqual({ error: "Unauthorized" })
  })
})
