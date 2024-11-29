import React, { memo, ReactNode } from "react";

const MemoizedChildren: React.FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    return <>{children}</>;
  }
);

export default MemoizedChildren;
