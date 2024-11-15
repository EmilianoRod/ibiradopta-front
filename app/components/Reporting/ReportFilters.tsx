"use client";
import { useState } from 'react';

interface DateRange {
    start: string;
    end: string;
  }

interface ReportFiltersProps {
    onFilterChange: (filters: { dateRange: DateRange; project: string }) => void;
    projects: string[];
}
  
  const ReportFilters: React.FC<ReportFiltersProps> = ({ onFilterChange, projects }) => {
    const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
    const [project, setProject] = useState<string>('');
  
    const handleApplyFilters = () => {
      onFilterChange({ dateRange, project });
    };
  
    return (
      <div>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <select value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
        </select>
        <button onClick={handleApplyFilters}>Aplicar Filtros</button>
      </div>
    );
  };
  
  export default ReportFilters;

  