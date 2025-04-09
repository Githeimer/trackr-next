import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export interface CellFillData {
  id: number;
  date: string;
  c_id: number;
  intensity: number;
  u_id: number;
}

const weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const ContributionBox = ({ categoryId, userId, color = '#39d353' }: { categoryId: number, userId: number, color: string }) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];
  
  const [cellData, setCellData] = useState<CellFillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<{ date: string, count: number, x: number, y: number } | null>(null);

  useEffect(() => {
    getCellData();
  }, [categoryId, userId]);

  const getCellData = async () => {
    try {
      setLoading(true);
      const DataToServer = {
        today: todayStr,
        oneYearAgo: oneYearAgoStr,
        categoryId,
        userId
      };
      const response = await axios.get("/api/cell", {
        params: DataToServer,
      });

      setCellData(response.data.CellData);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate all dates between oneYearAgo and today
  const generateDateCells = () => {
    const cells = [];
    const endDate = new Date(todayStr);
    const startDate = new Date(oneYearAgoStr);
    
    // Start from the beginning of the week for the start date
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    // We need 53 weeks × 7 days = 371 cells max
    const totalDays = 371;
    
    // Create all day cells
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Stop if we've gone past today
      if (currentDate > endDate) break;
      
      // Format date as YYYY-MM-DD for comparison
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Find matching data or use empty cell
      const matchingData = cellData.find(item => item.date === dateStr);
      
      cells.push({
        date: dateStr,
        dayOfWeek: currentDate.getDay(),
        intensity: matchingData ? matchingData.intensity : 0,
        data: matchingData || null
      });
    }
    
    return { cells };
  };

  const { cells } = generateDateCells();

  // Group cells by week
  const weeks = [];
  let currentWeek: { date: string; dayOfWeek: number; intensity: number; data: CellFillData | null; }[] = [];
  
  cells.forEach(cell => {
    if (cell.dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(cell);
  });
  
  // Add the last week if it exists
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Function to determine cell color based on intensity
  const getCellColor = (intensity: number) => {
    if (intensity === 0) return hexToRgba(color,0.08);
    
    // Extract the base color and create darker variants
    let baseColor = color;
    if (baseColor.startsWith('#')) {
      baseColor = baseColor.substring(1);
    }
    
    // Parse the color
    const r = parseInt(baseColor.substring(0, 2), 16);
    const g = parseInt(baseColor.substring(2, 4), 16);
    const b = parseInt(baseColor.substring(4, 6), 16);
    
    // Adjust brightness based on intensity (1-4)
    const brightnessMultiplier = 0.65 + (intensity * 0.15);
    
    // Ensure we don't go over 255
    const newR = Math.min(255, Math.floor(r * brightnessMultiplier));
    const newG = Math.min(255, Math.floor(g * brightnessMultiplier));
    const newB = Math.min(255, Math.floor(b * brightnessMultiplier));
    
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  // Handle mouse events for tooltips with position
  const handleMouseEnter = (e: React.MouseEvent, date: string | number | Date, intensity: number) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    setHoveredCell({
      date: formattedDate,
      count: intensity,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredCell) {
      setHoveredCell({
        ...hoveredCell,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="flex flex-col rounded-md p-1 relative border-2 border-[#202020]">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-pulse text-gray-400">Loading contributions...</div>
        </div>
      ) : (
        <>
          {/* Contribution grid */}
          <div className="flex overflow-x-auto justify-center p-2">
                        <div className='flex flex-col text-sm pr-2 text-gray-600'>
                {weekDays.map((ele, index) => {
                  return (
                    <span key={index}>
                      {ele === "Sun" || ele === "Tue" || ele === "Thu" || ele === "Sat" ? (
                        <div className='visibility-hidden opacity-0'>.</div>
                      ) : (
                        ele
                      )}
                    </span>
                  );
                })}
              </div>

            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {week.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className="w-3 h-3 rounded-[3px] m-0.5 border-1 border-[#ffffff0c]  cursor-pointer transition-colors duration-200"
                    style={{ backgroundColor: getCellColor(day.intensity) }}
                    onMouseEnter={(e) => handleMouseEnter(e, day.date, day.intensity)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Tooltip that follows the mouse */}
          {hoveredCell && (
            <div className="fixed bg-gray-800 text-white text-xs rounded-sm p-2 shadow-lg z-10 pointer-events-none"
                 style={{ 
                   left: `${hoveredCell.x + 15}px`, 
                   top: `${hoveredCell.y - 40}px` 
                 }}>
              <div>{hoveredCell.date}</div>
              <div>{hoveredCell.count} contribution{hoveredCell.count !== 1 ? 's' : ''}</div>
            </div>
          )}
          
        
        </>
      )}
    </div>
  );
};

function hexToRgba(hex: string, alpha: number) {
  let r = 0, g = 0, b = 0;

  // Remove '#' if present
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    // Handle short form like #abc
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



export default ContributionBox;