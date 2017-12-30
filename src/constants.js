const SQUARE_SIZE = 10;
const GRID_COLUMNS = 16;
const GRID_ROWS = 12;

export const dimensions = {
  SQUARE_SIZE,
  GRID_COLUMNS,
  GRID_ROWS,
  GRID_WIDTH: SQUARE_SIZE * GRID_COLUMNS,
  GRID_HEIGHT: SQUARE_SIZE * GRID_ROWS,
  SQUARE_STROKE_WIDTH: 0.1,
  SQUARE_STROKE_WIDTH_MATCHED: 0.5,
  GRID_STROKE_WIDTH: 0.1,
  SCAN_LINE_WIDTH: SQUARE_SIZE * 2,
};

export const colors = {
  SQUARE_STROKE: '#212121',
  SQUARE_STROKE_MATCHED: '#FFFFFF',
  SQUARE_DARK: '#FF9800',
  SQUARE_LIGHT: '#FAFAFA',
  SQUARE_DARK_MATCHED: '#FFB74D',
  SQUARE_LIGHT_MATCHED: '#EEEEEE',
  SQUARE_SCANNED: '#757575',
  GRID_STROKE: '#616161',
};
