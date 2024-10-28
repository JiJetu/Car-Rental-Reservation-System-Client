export const useTotalAmount = (
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  additionalFeatures: string[],
  additionalInsurance: string[],
  pricePerHour: number
) => {
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);

  const durationInHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  const featureCost = (additionalFeatures?.length * 20) | 0;
  const insuranceCost = (additionalInsurance?.length * 40) | 0;

  const baseCost = durationInHours * pricePerHour + featureCost + insuranceCost;

  const taxAmount = baseCost * 0.1;

  const totalCost = baseCost + taxAmount;

  return { totalCost, taxAmount };
};
