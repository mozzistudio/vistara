import { searchProducts, getProductById } from '@/lib/supabase/queries/products'
import { searchPharmacies, getPharmacyById } from '@/lib/supabase/queries/pharmacies'
import { getSellerPerformance } from '@/lib/supabase/queries/sellers'
import { getStockAlerts, getStockMatrix } from '@/lib/supabase/queries/stock'
import { getSalesData, getSalesComparison, getDashboardKpis } from '@/lib/supabase/queries/sales'

export async function executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_products':
      return searchProducts({
        query: input.query as string,
        therapeutic_class: input.therapeutic_class as string | undefined,
        limit: (input.limit as number | undefined) ?? 10,
      })

    case 'get_product_detail':
      return getProductById(input.product_id as string)

    case 'get_stock_levels':
      return getStockMatrix({
        region: input.region as string | undefined,
        level: input.level as ('ALTO' | 'MEDIO' | 'BAJO' | 'RUPTURA') | undefined,
        product_ids: input.product_id ? [input.product_id as string] : undefined,
        pharmacy_ids: input.pharmacy_id ? [input.pharmacy_id as string] : undefined,
      }).then(data => data.slice(0, (input.limit as number | undefined) ?? 20))

    case 'get_stock_alerts':
      return getStockAlerts({
        region: input.region as string | undefined,
        product_id: input.product_id as string | undefined,
      })

    case 'get_sales_data':
      return getSalesData({
        product_id: input.product_id as string | undefined,
        pharmacy_id: input.pharmacy_id as string | undefined,
        seller_id: input.seller_id as string | undefined,
        region: input.region as string | undefined,
        date_from: input.date_from as string | undefined,
        date_to: input.date_to as string | undefined,
        group_by: input.group_by as ('product' | 'pharmacy' | 'seller' | 'region' | 'day' | 'week' | 'month') | undefined,
        order_by: input.order_by as ('revenue_desc' | 'revenue_asc' | 'units_desc' | 'units_asc') | undefined,
        limit: (input.limit as number | undefined) ?? 20,
      })

    case 'get_sales_comparison':
      return getSalesComparison({
        period1_from: input.period1_from as string,
        period1_to: input.period1_to as string,
        period2_from: input.period2_from as string,
        period2_to: input.period2_to as string,
        product_id: input.product_id as string | undefined,
        pharmacy_id: input.pharmacy_id as string | undefined,
        region: input.region as string | undefined,
      })

    case 'search_pharmacies':
      return searchPharmacies({
        query: input.query as string | undefined,
        region: input.region as string | undefined,
        type: input.type as ('RETAIL' | 'HOSPITAL' | 'CHAIN' | 'CLINIC') | undefined,
        tier: input.tier as ('PREMIUM' | 'STANDARD' | 'BASIC') | undefined,
        limit: (input.limit as number | undefined) ?? 10,
      })

    case 'get_pharmacy_detail':
      return getPharmacyById(input.pharmacy_id as string)

    case 'get_seller_performance':
      return getSellerPerformance(
        input.seller_id as string | undefined,
        input.date_from as string | undefined,
        input.date_to as string | undefined,
      )

    case 'get_dashboard_summary':
      return getDashboardKpis(
        input.date_from as string | undefined,
        input.date_to as string | undefined,
      )

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}
