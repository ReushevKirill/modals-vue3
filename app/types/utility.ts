export type GetComponentPropsType<T extends abstract new (...args: any) => any> =
	InstanceType<T>['$props']
