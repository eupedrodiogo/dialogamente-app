import { useState, useEffect } from "react";
import { Plus, Trash2, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('list-coupons');
      
      if (error) throw error;
      
      setCoupons(data?.coupons || []);
    } catch (error: any) {
      console.error("Erro ao carregar cupons:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os cupons",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateVIPCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `VIP-${part1}-${part2}`;
  };

  const createBulkCoupons = async () => {
    if (!confirm('Criar 70 cupons VIP? Esta ação não pode ser desfeita.')) return;

    setCreating(true);
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 90); // 90 dias de validade

      const newCoupons = Array.from({ length: 70 }, () => ({
        code: generateVIPCode(),
        discount_type: 'free_month',
        max_uses: 1,
        expires_at: expiresAt.toISOString(),
        is_active: true
      }));

      const { data, error } = await supabase.functions.invoke('create-bulk-coupons', {
        body: { coupons: newCoupons }
      });

      if (error) throw error;

      toast({
        title: "✅ Cupons criados!",
        description: `${newCoupons.length} cupons VIP foram gerados com sucesso`,
      });

      loadCoupons();
    } catch (error: any) {
      console.error("Erro ao criar cupons:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar os cupons",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const deactivateCoupon = async (id: string) => {
    if (!confirm('Desativar este cupom?')) return;

    try {
      const { error } = await supabase.functions.invoke('deactivate-coupon', {
        body: { coupon_id: id }
      });

      if (error) throw error;

      toast({
        title: "Cupom desativado",
        description: "O cupom foi desativado com sucesso",
      });

      loadCoupons();
    } catch (error: any) {
      console.error("Erro ao desativar cupom:", error);
      toast({
        title: "Erro",
        description: "Não foi possível desativar o cupom",
        variant: "destructive"
      });
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Código', 'Usos', 'Máx Usos', 'Expira em', 'Status'].join(','),
      ...coupons.map(c => [
        c.code,
        c.current_uses,
        c.max_uses,
        new Date(c.expires_at).toLocaleDateString(),
        c.is_active ? 'Ativo' : 'Inativo'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cupons-vip-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin - Cupons VIP
          </h1>
          <p className="text-muted-foreground">
            Gerencie cupons secretos de acesso premium
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={createBulkCoupons}
            disabled={creating}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            {creating ? "Gerando..." : "Gerar 70 Cupons VIP"}
          </Button>
          
          <Button onClick={loadCoupons} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>

          <Button 
            onClick={exportToCSV} 
            variant="outline"
            disabled={coupons.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="text-3xl font-bold text-purple-600">
              {coupons.length}
            </div>
            <div className="text-sm text-muted-foreground">Total de Cupons</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-3xl font-bold text-green-600">
              {coupons.filter(c => c.is_active && c.current_uses < c.max_uses).length}
            </div>
            <div className="text-sm text-muted-foreground">Disponíveis</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-3xl font-bold text-orange-600">
              {coupons.filter(c => c.current_uses >= c.max_uses).length}
            </div>
            <div className="text-sm text-muted-foreground">Esgotados</div>
          </Card>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Expira em</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Nenhum cupom encontrado
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono font-bold">
                      {coupon.code}
                    </TableCell>
                    <TableCell>
                      <span className={coupon.current_uses >= coupon.max_uses ? "text-red-600" : ""}>
                        {coupon.current_uses} / {coupon.max_uses}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(coupon.expires_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {coupon.is_active ? (
                        coupon.current_uses >= coupon.max_uses ? (
                          <Badge variant="outline" className="bg-orange-50">Esgotado</Badge>
                        ) : (
                          <Badge className="bg-green-50 text-green-700">Ativo</Badge>
                        )
                      ) : (
                        <Badge variant="outline">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {coupon.is_active && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deactivateCoupon(coupon.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AdminCoupons;