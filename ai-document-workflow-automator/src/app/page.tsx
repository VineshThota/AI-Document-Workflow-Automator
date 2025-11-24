'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Zap, BarChart3, Settings, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ProcessedDocument {
  id: string;
  name: string;
  type: string;
  status: 'processing' | 'completed' | 'error';
  extractedData?: {
    vendor?: string;
    amount?: number;
    date?: string;
    category?: string;
  };
  workflowTriggered?: string;
  timestamp: Date;
}

export default function HomePage() {
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    for (const file of acceptedFiles) {
      const newDoc: ProcessedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        status: 'processing',
        timestamp: new Date()
      };
      
      setDocuments(prev => [newDoc, ...prev]);
      
      // Simulate AI processing
      setTimeout(() => {
        const mockExtractedData = {
          vendor: 'Acme Corp',
          amount: Math.floor(Math.random() * 5000) + 100,
          date: new Date().toISOString().split('T')[0],
          category: 'Office Supplies'
        };
        
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? { 
                  ...doc, 
                  status: 'completed' as const,
                  extractedData: mockExtractedData,
                  workflowTriggered: mockExtractedData.amount > 1000 ? 'Manager Approval Required' : 'Auto-approved'
                }
              : doc
          )
        );
      }, 3000);
    }
    
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt']
    },
    multiple: true
  });

  const getStatusIcon = (status: ProcessedDocument['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const stats = {
    totalProcessed: documents.filter(d => d.status === 'completed').length,
    processing: documents.filter(d => d.status === 'processing').length,
    avgProcessingTime: '2.3s',
    workflowsTriggered: documents.filter(d => d.workflowTriggered).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AI Document Workflow Automator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Processed Today</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProcessed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Processing</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.processing}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Processing</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.avgProcessingTime}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Workflows Triggered</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.workflowsTriggered}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upload Documents</h2>
                <p className="text-sm text-gray-500">Drag and drop files or click to browse</p>
              </div>
              
              <div className="p-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-indigo-600 font-medium">Drop files here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium mb-2">Upload your documents</p>
                      <p className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
                
                {isProcessing && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 animate-spin mr-2" />
                      <span className="text-blue-700 font-medium">Processing documents...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Documents</h2>
                <p className="text-sm text-gray-500">AI-processed documents and extracted data</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {documents.length === 0 ? (
                  <div className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No documents processed yet</p>
                    <p className="text-sm text-gray-400">Upload a document to get started</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(doc.status)}
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-xs text-gray-500">
                              {doc.timestamp.toLocaleTimeString()}
                            </p>
                            
                            {doc.extractedData && (
                              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Vendor:</span>
                                  <span className="ml-2 font-medium">{doc.extractedData.vendor}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Amount:</span>
                                  <span className="ml-2 font-medium">${doc.extractedData.amount}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Date:</span>
                                  <span className="ml-2 font-medium">{doc.extractedData.date}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Category:</span>
                                  <span className="ml-2 font-medium">{doc.extractedData.category}</span>
                                </div>
                              </div>
                            )}
                            
                            {doc.workflowTriggered && (
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {doc.workflowTriggered}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}