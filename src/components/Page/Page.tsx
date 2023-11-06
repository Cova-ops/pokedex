import { forwardRef, LegacyRef, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

type typeProps = {
  children: ReactNode,
  title: string,
  meta?: ReactNode,
  className: string
}

const Page = forwardRef(({ children, title = '', meta, ...other }: typeProps, ref: LegacyRef<HTMLDivElement>) => (
  <>
    <Helmet>
      <title>{title}</title>
      {meta}
    </Helmet>

    <div ref={ref} {...other}>
      {children}
    </div>
  </>
))

export default Page
