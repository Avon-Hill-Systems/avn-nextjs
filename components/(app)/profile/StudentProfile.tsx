"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Trash2, Loader2, CheckCircle, AlertCircle, Download } from "lucide-react";
import { StudentProfileForm } from "./StudentProfileForm";
import { useResumeQuery, useUploadResumeMutation, useDeleteResumeMutation } from "@/lib/api-service";
import { useAuth } from "@/hooks/use-auth";
import { config } from "@/lib/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Backend response format for resume upload
interface BackendResumeResponse {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export function StudentProfile() {
  const { session } = useAuth();
  const user = session?.user;
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFirstUpload, setIsFirstUpload] = useState(true);

  // Cached resume via React Query
  const { data: resumeMetadata, isLoading } = useResumeQuery(user?.id);
  const uploadMutation = useUploadResumeMutation(user?.id);
  const deleteMutation = useDeleteResumeMutation(user?.id);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (resumeMetadata) setIsFirstUpload(false);
  }, [resumeMetadata]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!cvFile || !user?.id) return;

    try {
      setIsUploading(true);
      setError(null);
      setSuccessMessage(null);
      await uploadMutation.mutateAsync({ file: cvFile });
      setCvFile(null);
      setShowSuccessModal(true);
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!user?.id || !resumeMetadata) return;

    try {
      setIsDeleting(true);
      setError(null);
      setSuccessMessage(null);
      await deleteMutation.mutateAsync();
      setSuccessMessage('Resume deleted successfully!');
      setShowDeleteConfirm(false);
      setIsFirstUpload(true);
    } catch (err) {
      setError('Failed to delete resume. Please try again.');
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewResume = async () => {
    if (!user?.id || !resumeMetadata) return;

    console.log('🔍 Resume View - Starting process:', {
      userId: user.id,
      resumeMetadata
    });

    try {
      // Ensure we have metadata from cache
      if (!resumeMetadata) {
        setError('No resume found');
        return;
      }

      // Now fetch the actual file content for download
      const fileUrl = `${config.api.baseUrl}/users/${user.id}/resume`;
      console.log('🌐 Fetching file from URL:', fileUrl);
      
      const fileResponse = await fetch(fileUrl, {
        credentials: 'include',
      });
      
      console.log('📥 File fetch response:', {
        status: fileResponse.status,
        statusText: fileResponse.statusText,
        headers: Object.fromEntries(fileResponse.headers.entries()),
        url: fileResponse.url
      });
      
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch resume file: ${fileResponse.status} ${fileResponse.statusText}`);
      }

      // Check content type
      const contentType = fileResponse.headers.get('content-type');
      console.log('📄 Response content type:', contentType);
      
      // Get the blob and create a download link
      const blob = await fileResponse.blob();
      console.log('📦 Blob created:', {
        size: blob.size,
        type: blob.type
      });
      
      const url = window.URL.createObjectURL(blob);
      console.log('🔗 Object URL created:', url);
      
      // Use the filename from our stored metadata (this preserves the original filename)
      const downloadFilename = resumeMetadata.filename || 'resume';
      console.log('📥 Using filename from metadata for download:', downloadFilename);
      
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadFilename;
      console.log('📥 Triggering download with filename:', downloadFilename);
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log('✅ Download completed successfully');
      
    } catch (err) {
      console.error('❌ Resume view error:', err);
      setError('Failed to view resume. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-foreground">Profile</h1>
        <p className="text-muted-foreground">General information about yourself and internship preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Profile Form */}
        <div className="space-y-6">
          <StudentProfileForm />
        </div>

        {/* Right Column - CV Upload */}
        <div className="h-full">
          <Card className="bg-background border-0 h-full min-h-[calc(100vh-13rem)]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>CV Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 h-full flex flex-col">
              {/* Success Message */}
              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading resume...</p>
                  </div>
                </div>
              ) : resumeMetadata ? (
                // Show existing resume with enhanced UI
                <div className="flex-1 flex flex-col">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-normal text-foreground">
                            {resumeMetadata.filename}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(resumeMetadata.size)} • {resumeMetadata.contentType}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleViewResume}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          onClick={() => setShowDeleteConfirm(true)}
                          variant="outline"
                          size="sm"
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Uploaded: {new Date(resumeMetadata.uploadedAt).toLocaleDateString()}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  {/* Replace resume section */}
                  <div className="text-center p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/30">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Replace your CV
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload"
                    />
                    <Button
                      onClick={() => document.getElementById('cv-upload')?.click()}
                      variant="outline"
                      size="sm"
                      className="mb-3"
                    >
                      Choose New File
                    </Button>
                    
                    {cvFile && (
                      <div className="mt-3 p-3 bg-background rounded-lg border">
                        <p className="text-sm text-foreground mb-2">
                          New file: {cvFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {formatFileSize(cvFile.size)}
                        </p>
                        <Button
                          onClick={handleUpload}
                          disabled={isUploading}
                          className="w-full"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Replacing...
                            </>
                          ) : (
                            'Replace CV'
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Show upload area when no resume exists
                <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg flex-1 flex flex-col items-center justify-center bg-muted/30">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {cvFile ? cvFile.name : "Upload your CV"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload"
                />
                <Button
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  variant="outline"
                  size="sm"
                    className="mb-3"
                >
                  Choose File
                </Button>
              
              {cvFile && (
                    <div className="mt-3 p-3 bg-background rounded-lg border w-full">
                      <p className="text-sm text-foreground mb-2">
                        Selected: {cvFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {formatFileSize(cvFile.size)}
                      </p>
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          'Upload CV'
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-normal">Delete Resume</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete your resume? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteResume}
                disabled={isDeleting}
                className="flex-1"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Resume'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Success!</DialogTitle>
            <DialogDescription className="text-center">
              {isFirstUpload ? 
                "Resume uploaded successfully! You will receive an email from our team to schedule your first round interview." : 
                "Resume updated successfully!"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="px-8"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
