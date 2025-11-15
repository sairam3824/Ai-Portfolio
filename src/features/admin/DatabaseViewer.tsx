import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { RefreshCw, Database, Table as TableIcon } from "lucide-react";
import { toast } from "sonner";

interface TableInfo {
  table_name: string;
  row_count: number;
}

interface TableData {
  [key: string]: any;
}

const DatabaseViewer = () => {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      // Get all tables from information_schema
      const { data, error } = await supabase.rpc('get_table_info');
      
      if (error) {
        // Fallback: try to get known tables
        const knownTables = ['blog_posts', 'blog_subscribers', 'contact_messages'];
        const tableInfo: TableInfo[] = [];
        
        for (const tableName of knownTables) {
          const { count, error: countError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          if (!countError) {
            tableInfo.push({
              table_name: tableName,
              row_count: count || 0
            });
          }
        }
        
        setTables(tableInfo);
      } else {
        setTables(data || []);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
      toast.error("Failed to load database tables");
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName: string) => {
    setDataLoading(true);
    setSelectedTable(tableName);
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(100);

      if (error) throw error;

      setTableData(data || []);
      
      // Extract column names from first row
      if (data && data.length > 0) {
        setColumns(Object.keys(data[0]));
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
      toast.error(`Failed to load data from ${tableName}`);
      setTableData([]);
      setColumns([]);
    } finally {
      setDataLoading(false);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "NULL";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (typeof value === "string" && value.length > 100) {
      return value.substring(0, 100) + "...";
    }
    return String(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading database tables...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Database Tables</h2>
        </div>
        <Button variant="outline" size="sm" onClick={fetchTables}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <Card
            key={table.table_name}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTable === table.table_name ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => fetchTableData(table.table_name)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">{table.table_name}</CardTitle>
              </div>
              <CardDescription>
                {table.row_count} {table.row_count === 1 ? "row" : "rows"}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedTable && (
        <Card>
          <CardHeader>
            <CardTitle>Table: {selectedTable}</CardTitle>
            <CardDescription>
              Showing {tableData.length} rows (limited to 100)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dataLoading ? (
              <div className="text-center py-8">Loading data...</div>
            ) : tableData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No data in this table
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="text-left p-3 font-semibold whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/30">
                        {columns.map((col) => (
                          <td
                            key={col}
                            className="p-3 max-w-xs overflow-hidden text-ellipsis"
                          >
                            <div className="whitespace-pre-wrap break-words">
                              {formatValue(row[col])}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatabaseViewer;
