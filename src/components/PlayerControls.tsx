export default function PlayerControls() {
	const controls = ['Back', 'Play', 'Forwards']

	return (
		<div className="w-full">
			<div className="flex gap-x-6 justify-center mb-3">
				{controls.map((control) => (
					<button key={control} type="button" className="text-xl link-primary font-medium">
						{control}
					</button>
				))}
			</div>
			<div className="flex gap-x-6 justify-center">
				<button type="button" className="text-xl link-primary font-medium">
					Sleep timer
				</button>
			</div>
		</div>
	)
}
