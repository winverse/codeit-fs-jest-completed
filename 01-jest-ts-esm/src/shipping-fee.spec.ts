import { shippingFee } from "#src/shipping-fee.js";

describe("shippingFee", () => {
  test("주문 금액이 50,000원 미만이면 배송비 3,000원을 반환한다", () => {
    expect(shippingFee(49_000)).toBe(3_000);
  });

  test("주문 금액이 50,000원 이상이면 배송비 0원을 반환한다", () => {
    expect(shippingFee(50_000)).toBe(0);
  });
});
