import { db } from "@/lib/db"
import { getAllCategories } from "./queries"

jest.mock("../../db", () => ({
  db: {
    select: jest.fn().mockImplementation(() => ({
      from: (v) => ["Personal", "Other"],
    })),
  },
}))

describe("getAllCategories", () => {
  it("should 2 categories", async () => {
    expect(await getAllCategories()).toEqual({ error: "Unauthorised" })
  })
})
