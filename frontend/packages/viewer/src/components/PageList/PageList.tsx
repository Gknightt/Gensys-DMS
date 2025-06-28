import {Loader, Stack} from "@mantine/core"
import {forwardRef} from "react"
import classes from "./PageList.module.css"

interface Args {
  pageItems: Array<React.ReactNode>
  paginationInProgress: boolean
  zoom: React.ReactNode
}

export const PageList = forwardRef<HTMLDivElement, Args>(
  ({zoom, pageItems, paginationInProgress}, ref) => {
    return (
      <Stack
        ref={ref}
        justify="center"
        className={`${classes.pages} page-list`}
      >
        {pageItems}
        {zoom}
        {paginationInProgress && (
          <Loader className={classes.pageListLoader} type="oval" />
        )}
      </Stack>
    )
  }
)

PageList.displayName = "PageList"

export default PageList
