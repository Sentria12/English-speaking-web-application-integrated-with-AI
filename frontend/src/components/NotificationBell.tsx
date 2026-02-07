import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Badge, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";

const NotificationBell = ({ userId }: { userId: number | undefined }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={0} color="error">
          <Bell size={22} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 300, maxHeight: 400 } }}
      >
        <MenuItem>
          <Typography variant="body2">Không có thông báo mới</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NotificationBell;    