import BASE_URL from '../config';

export const getPedidos = async () => {
  const response = await fetch(`${BASE_URL}/pedidos`);
  if (!response.ok) throw new Error('Error al obtener pedidos');
  return await response.json();
};

export const updatePedidoEstado = async (pedidoId, nuevoEstado) => {
  const response = await fetch(`${BASE_URL}/pedidos/${pedidoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  });
  if (!response.ok) throw new Error('Error al actualizar el estado del pedido');
  return await response.json();
};

export const deletePedido = async (pedidoId) => {
  const response = await fetch(`${BASE_URL}/pedidos/${pedidoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el pedido');
  return response;
};
