export function shippingFee(orderAmount: number): number {
  return orderAmount >= 50_000 ? 0 : 3_000;
}
