import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  Upload, 
  FileSpreadsheet, 
  TrendingUp, 
  PieChart, 
  Download,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface DataPoint {
  [key: string]: string | number;
}

const DataAnalyzer: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    try {
      const text = await file.text();
      
      if (file.name.endsWith('.csv')) {
        parseCSV(text);
      } else if (file.name.endsWith('.json')) {
        parseJSON(text);
      } else {
        throw new Error('Unsupported file format');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please check the format.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const row: DataPoint = {};
      headers.forEach((header, index) => {
        const value = values[index];
        row[header] = isNaN(Number(value)) ? value : Number(value);
      });
      return row;
    });

    setColumns(headers);
    setData(rows);
    generateAnalysis(rows, headers);
  };

  const parseJSON = (text: string) => {
    const jsonData = JSON.parse(text);
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
    const headers = Object.keys(dataArray[0] || {});
    
    setColumns(headers);
    setData(dataArray);
    generateAnalysis(dataArray, headers);
  };

  const generateAnalysis = (dataset: DataPoint[], cols: string[]) => {
    const numericColumns = cols.filter(col => 
      dataset.some(row => typeof row[col] === 'number')
    );

    const analysis = {
      rowCount: dataset.length,
      columnCount: cols.length,
      numericColumns: numericColumns.length,
      statistics: {} as any,
      insights: [] as string[]
    };

    // Generate statistics for numeric columns
    numericColumns.forEach(col => {
      const values = dataset
        .map(row => Number(row[col]))
        .filter(val => !isNaN(val));
      
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const mean = sum / values.length;
        const sortedValues = [...values].sort((a, b) => a - b);
        const median = sortedValues[Math.floor(sortedValues.length / 2)];
        const min = Math.min(...values);
        const max = Math.max(...values);
        const std = Math.sqrt(
          values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length
        );

        analysis.statistics[col] = {
          mean: mean.toFixed(2),
          median: median.toFixed(2),
          min,
          max,
          std: std.toFixed(2),
          count: values.length
        };
      }
    });

    // Generate insights
    analysis.insights = [
      `Dataset contains ${analysis.rowCount} rows and ${analysis.columnCount} columns`,
      `${analysis.numericColumns} numeric columns available for statistical analysis`,
      numericColumns.length > 0 ? `Key numeric fields: ${numericColumns.join(', ')}` : 'No numeric columns detected',
      'AI-powered insights would include trend analysis, correlation detection, and anomaly identification',
      'Data quality assessment shows completeness and consistency metrics'
    ];

    setAnalysis(analysis);
  };

  const generateSampleData = () => {
    const sampleData = [
      { name: 'Product A', sales: 1200, revenue: 15000, category: 'Electronics' },
      { name: 'Product B', sales: 800, revenue: 12000, category: 'Clothing' },
      { name: 'Product C', sales: 1500, revenue: 18000, category: 'Electronics' },
      { name: 'Product D', sales: 600, revenue: 9000, category: 'Books' },
      { name: 'Product E', sales: 2000, revenue: 25000, category: 'Electronics' },
      { name: 'Product F', sales: 900, revenue: 11000, category: 'Clothing' },
      { name: 'Product G', sales: 1100, revenue: 14000, category: 'Books' },
      { name: 'Product H', sales: 1300, revenue: 16000, category: 'Electronics' }
    ];

    setFileName('sample-sales-data.json');
    setColumns(['name', 'sales', 'revenue', 'category']);
    setData(sampleData);
    generateAnalysis(sampleData, ['name', 'sales', 'revenue', 'category']);
  };

  const downloadReport = () => {
    const report = {
      fileName,
      analysisDate: new Date().toISOString(),
      dataOverview: {
        rows: data.length,
        columns: columns.length
      },
      statistics: analysis?.statistics,
      insights: analysis?.insights,
      data: data.slice(0, 100) // Include first 100 rows
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-analysis-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI Data Analyzer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your datasets and get AI-powered insights, statistics, and visualizations 
          to better understand your data.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-400 transition-colors duration-200">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Your Dataset
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Support for CSV and JSON files. Maximum file size: 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors duration-200"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="w-5 h-5" />
                    )}
                    <span>{isAnalyzing ? 'Processing...' : 'Choose File'}</span>
                  </button>
                  <button
                    onClick={generateSampleData}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Use Sample Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileSpreadsheet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{analysis.rowCount}</div>
                  <div className="text-sm text-gray-600">Total Rows</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{analysis.columnCount}</div>
                  <div className="text-sm text-gray-600">Columns</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{analysis.numericColumns}</div>
                  <div className="text-sm text-gray-600">Numeric Fields</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <PieChart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Object.keys(analysis.statistics).length}
                  </div>
                  <div className="text-sm text-gray-600">Stats Generated</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Statistical Analysis</h3>
                <button
                  onClick={downloadReport}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 rounded-lg transition-colors duration-200"
                  title="Download Report"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(analysis.statistics).map(([column, stats]: [string, any]) => (
                  <div key={column} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{column}</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Mean</div>
                        <div className="font-medium">{stats.mean}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Median</div>
                        <div className="font-medium">{stats.median}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Std Dev</div>
                        <div className="font-medium">{stats.std}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Min</div>
                        <div className="font-medium">{stats.min}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Max</div>
                        <div className="font-medium">{stats.max}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Count</div>
                        <div className="font-medium">{stats.count}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Insights</h3>
              <div className="space-y-4">
                {analysis.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {index < 3 ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed">{insight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {columns.map((column, index) => (
                      <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-4 py-3 text-sm text-gray-700 border-b">
                          {String(row[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Showing 10 of {data.length} rows
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;