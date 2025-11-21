export interface Props {
	/**
	 * Child elements to be laid out vertically.
	 */
	children: React.ReactNode

	/**
	 * Gap between children in pixels. Default is 16.
	 */
	gap?: number

	/**
	 * Padding around the container in pixels. Default is 0.
	 */
	padding?: number

	/**
	 * Horizontal alignment of children. Default is 'stretch'.
	 */
	align?: 'start' | 'center' | 'end' | 'stretch'

	/**
	 * Vertical alignment of children within the container. Default is 'start'.
	 */
	justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
}

export default ({
	children,
	gap = 16,
	padding = 0,
	align = 'stretch',
	justify = 'start'
}: Props) => {
	const containerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: `${gap}px`,
		padding: `${padding}px`,
		alignItems: align,
		justifyContent: justify,
	}

	return (
		<div style={containerStyle}>
			{children}
		</div>
	)
}
