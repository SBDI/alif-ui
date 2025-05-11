'use client';

import { useState } from 'react';

interface WriteParams {
  topic: string;
  type: 'essay' | 'summary' | 'outline' | 'notes';
  instructions?: string;
}

export function useWrite(folderId: string, activityId?: string) {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateContent = async (params: WriteParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock content based on type
      let mockContent = '';
      
      if (params.type === 'essay') {
        mockContent = `
          <h1>${params.topic}</h1>
          <p>This is a mock essay on ${params.topic} that would be generated based on the resources in folder ${folderId}${activityId ? ` and activity ${activityId}` : ''}.</p>
          <p>The essay would include an introduction, body paragraphs, and a conclusion.</p>
          <p>It would incorporate information from your resources and follow any specific instructions: ${params.instructions || 'None provided'}.</p>
          <h2>Introduction</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <h2>Body</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
          <h2>Conclusion</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
        `;
      } else if (params.type === 'summary') {
        mockContent = `
          <h1>Summary: ${params.topic}</h1>
          <p>This is a mock summary of ${params.topic} that would be generated based on the resources in folder ${folderId}${activityId ? ` and activity ${activityId}` : ''}.</p>
          <p>The summary would concisely cover the main points and key information.</p>
          <p>It would follow any specific instructions: ${params.instructions || 'None provided'}.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
        `;
      } else if (params.type === 'outline') {
        mockContent = `
          <h1>Outline: ${params.topic}</h1>
          <p>This is a mock outline for ${params.topic} that would be generated based on the resources in folder ${folderId}${activityId ? ` and activity ${activityId}` : ''}.</p>
          <p>It would follow any specific instructions: ${params.instructions || 'None provided'}.</p>
          <h2>I. Introduction</h2>
          <ul>
            <li>A. Background information</li>
            <li>B. Thesis statement</li>
          </ul>
          <h2>II. Main Point 1</h2>
          <ul>
            <li>A. Supporting evidence</li>
            <li>B. Examples</li>
          </ul>
          <h2>III. Main Point 2</h2>
          <ul>
            <li>A. Supporting evidence</li>
            <li>B. Examples</li>
          </ul>
          <h2>IV. Conclusion</h2>
          <ul>
            <li>A. Summary of main points</li>
            <li>B. Final thoughts</li>
          </ul>
        `;
      } else {
        mockContent = `
          <h1>Notes: ${params.topic}</h1>
          <p>These are mock notes on ${params.topic} that would be generated based on the resources in folder ${folderId}${activityId ? ` and activity ${activityId}` : ''}.</p>
          <p>They would follow any specific instructions: ${params.instructions || 'None provided'}.</p>
          <ul>
            <li>Key point 1: Lorem ipsum dolor sit amet</li>
            <li>Key point 2: Consectetur adipiscing elit</li>
            <li>Key point 3: Nullam auctor, nisl eget ultricies tincidunt</li>
            <li>Definition: Lorem ipsum - dolor sit amet</li>
            <li>Example: Lorem ipsum dolor sit amet</li>
            <li>Important date: Lorem ipsum dolor sit amet</li>
          </ul>
        `;
      }
      
      setContent(mockContent);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate content'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    isLoading,
    error,
    generateContent,
  };
}
