import api from "@/lib/api"

export const customerService = {
  async getDashboard(id: number) {
    const res = await api.get(`users/${id}/achievements`)
    return res.data
  },

  async simulatePurchase(id: number) {
    const res = await api.post(`users/${id}/simulate-purchase`)
    return res.data
  },
}
