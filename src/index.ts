export class Estimate {
	private readonly state;
	constructor({
		progress = 0,
		total = 100,
		startTime,
	}: {
		progress?: number;
		total?: number;
		startTime?: number;
	} = {}) {
		this.state = {
			progress,
			total,
			startTime: startTime ?? this.now(),
		};
	}

	public reset(time?: number) {
		return (this.state.startTime = time !== undefined ? time : this.now());
	}

	public update(progress: number, total?: number) {
		this.state.progress = progress;

		if (total !== undefined) {
			this.state.total = total;
		}

		return this.measure();
	}

	public estimate() {
		return this.measure().estimate;
	}

	public measure(tick = 1000) {
		const { progress, total } = this.state;

		const timeDelta = this.now() - this.state.startTime;
		const averageTime = timeDelta / progress;
		const progressLeft = total - progress;
		const estimate = averageTime * progressLeft;
		const speed = tick / averageTime;

		return {
			timeDelta,
			averageTime,
			progressLeft,
			speed,
			estimate,
		};
	}

	public now() {
		return performance.now();
	}
}
