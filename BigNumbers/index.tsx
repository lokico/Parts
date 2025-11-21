export interface Metric {
	/**
	 * Label for the metric.
	 */
	label: string

	/**
	 * Value of the metric.
	 */
	value: number | string

	/**
	 * Optional percentage change of the metric.
	 */
	change?: number

	/**
	 * Optional label for the change (e.g., "Since last month" or "YOY").
	 */
	changeLabel?: string
	format?: (value: number | string) => string
}

export interface Props {
	/**
	 * Number of columns to display the metrics in. Default is 3.
	 */
	columns?: number

	/**
	 * Array of metrics to display.
	 */
	metrics: Metric[]
}

const defaultFormat = (value: number | string): string => {
	if (typeof value === 'number') {
		return new Intl.NumberFormat(navigator.language || 'en-US').format(value)
	}
	return String(value)
}

const formatChange = (change: number): string => {
	const sign = change > 0 ? '+' : ''
	return `${sign}${change.toFixed(1)}%`
}

export default ({ metrics, columns = 3 }: Props) => {
	const containerStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: '24px',
		padding: '20px',
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	}

	const cardStyle: React.CSSProperties = {
		padding: '24px',
		backgroundColor: '#ffffff',
		borderRadius: '8px',
		boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
		border: '1px solid #e5e7eb',
	}

	const labelStyle: React.CSSProperties = {
		fontSize: '14px',
		color: '#6b7280',
		marginBottom: '8px',
		fontWeight: 500,
		textTransform: 'uppercase',
		letterSpacing: '0.05em',
	}

	const valueStyle: React.CSSProperties = {
		fontSize: '36px',
		fontWeight: 700,
		color: '#111827',
		marginBottom: '8px',
		lineHeight: 1,
	}

	const changeContainerStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
		fontSize: '14px',
		marginTop: '8px',
	}

	const getChangeStyle = (change: number): React.CSSProperties => ({
		color: change > 0 ? '#10b981' : change < 0 ? '#ef4444' : '#6b7280',
		fontWeight: 600,
	})

	const changeLabelStyle: React.CSSProperties = {
		color: '#9ca3af',
	}

	return (
		<div style={containerStyle}>
			{metrics.map((metric, index) => {
				const formatter = metric.format || defaultFormat
				const displayValue = formatter(metric.value)

				return (
					<div key={index} style={cardStyle}>
						<div style={labelStyle}>{metric.label}</div>
						<div style={valueStyle}>{displayValue}</div>
						{metric.change !== undefined && (
							<div style={changeContainerStyle}>
								<span style={getChangeStyle(metric.change)}>
									{formatChange(metric.change)}
								</span>
								{metric.changeLabel && (
									<span style={changeLabelStyle}>{metric.changeLabel}</span>
								)}
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}