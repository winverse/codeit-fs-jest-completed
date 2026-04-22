export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSummaryItem {
  name: string;
  subtotal: number;
}

export interface OrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: OrderSummaryItem[];
}

export function createOrderSummary(items: OrderItem[]): OrderSummary {
  const visibleItems = items
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      name: item.name,
      subtotal: item.price * item.quantity,
      quantity: item.quantity,
    }));

  const itemCount = visibleItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = visibleItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = subtotal >= 50_000 ? 0 : 3_000;

  return {
    itemCount,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    items: visibleItems.map(({ name, subtotal: itemSubtotal }) => ({
      name,
      subtotal: itemSubtotal,
    })),
  };
}
