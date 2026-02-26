import type Anthropic from '@anthropic-ai/sdk'

export const AI_TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_products',
    description: 'Busca productos farmacéuticos por nombre, molécula o clase terapéutica. Devuelve info del producto incluyendo resúmenes de stock.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Término de búsqueda (nombre del producto, molécula o clase)' },
        therapeutic_class: { type: 'string', description: 'Filtrar por clase terapéutica' },
        limit: { type: 'number', description: 'Máximo de resultados (default 10)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_product_detail',
    description: 'Obtiene detalles completos de un producto específico incluyendo info clínica, stock total y resumen de ventas recientes.',
    input_schema: {
      type: 'object',
      properties: {
        product_id: { type: 'string' },
      },
      required: ['product_id'],
    },
  },
  {
    name: 'get_stock_levels',
    description: 'Obtiene niveles de stock actuales. Puede filtrar por producto, farmacia, región o nivel de stock (ALTO/MEDIO/BAJO/RUPTURA).',
    input_schema: {
      type: 'object',
      properties: {
        product_id: { type: 'string' },
        pharmacy_id: { type: 'string' },
        region: { type: 'string' },
        level: { type: 'string', enum: ['ALTO', 'MEDIO', 'BAJO', 'RUPTURA'] },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'get_stock_alerts',
    description: 'Obtiene todas las entradas de stock en nivel BAJO o RUPTURA, ordenadas por severidad. Devuelve nombre de farmacia, nombre de producto, cantidad.',
    input_schema: {
      type: 'object',
      properties: {
        region: { type: 'string' },
        product_id: { type: 'string' },
      },
    },
  },
  {
    name: 'get_sales_data',
    description: 'Consulta datos de ventas con filtros flexibles. Devuelve ventas agregadas (unidades, ingresos) agrupadas según se solicite.',
    input_schema: {
      type: 'object',
      properties: {
        product_id: { type: 'string' },
        pharmacy_id: { type: 'string' },
        seller_id: { type: 'string' },
        region: { type: 'string' },
        date_from: { type: 'string', description: 'Fecha ISO' },
        date_to: { type: 'string', description: 'Fecha ISO' },
        group_by: { type: 'string', enum: ['product', 'pharmacy', 'seller', 'region', 'day', 'week', 'month'] },
        order_by: { type: 'string', enum: ['revenue_desc', 'revenue_asc', 'units_desc', 'units_asc'] },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'get_sales_comparison',
    description: 'Compara ventas entre dos períodos. Devuelve métricas para ambos períodos y el delta.',
    input_schema: {
      type: 'object',
      properties: {
        period1_from: { type: 'string' },
        period1_to: { type: 'string' },
        period2_from: { type: 'string' },
        period2_to: { type: 'string' },
        product_id: { type: 'string' },
        pharmacy_id: { type: 'string' },
        region: { type: 'string' },
      },
      required: ['period1_from', 'period1_to', 'period2_from', 'period2_to'],
    },
  },
  {
    name: 'search_pharmacies',
    description: 'Busca farmacias por nombre, región, tipo o tier.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        region: { type: 'string' },
        type: { type: 'string', enum: ['RETAIL', 'HOSPITAL', 'CHAIN', 'CLINIC'] },
        tier: { type: 'string', enum: ['PREMIUM', 'STANDARD', 'BASIC'] },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'get_pharmacy_detail',
    description: 'Obtiene detalles completos de una farmacia específica incluyendo resumen de stock y ventas.',
    input_schema: {
      type: 'object',
      properties: {
        pharmacy_id: { type: 'string' },
      },
      required: ['pharmacy_id'],
    },
  },
  {
    name: 'get_seller_performance',
    description: 'Obtiene datos de rendimiento de un vendedor o todos los vendedores. Incluye ingresos vs objetivo, conteo de visitas, cobertura de farmacias.',
    input_schema: {
      type: 'object',
      properties: {
        seller_id: { type: 'string' },
        date_from: { type: 'string' },
        date_to: { type: 'string' },
      },
    },
  },
  {
    name: 'get_dashboard_summary',
    description: 'Obtiene KPIs de alto nivel: total de productos, farmacias activas, unidades vendidas, ingresos totales, conteo de alertas. Usar para preguntas generales.',
    input_schema: {
      type: 'object',
      properties: {
        date_from: { type: 'string' },
        date_to: { type: 'string' },
      },
    },
  },
]
