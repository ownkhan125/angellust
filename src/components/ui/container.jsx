import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

const Container = ({ as: As = 'div', className, children, size = 'default', ...props }) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[88rem]',
    full: 'max-w-none',
  }
  return (
    <As className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)} {...props}>
      {children}
    </As>
  )
}

Container.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'default', 'wide', 'full']),
}

export default Container
