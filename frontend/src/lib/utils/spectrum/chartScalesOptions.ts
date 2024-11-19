export const chartScalesOptions = (xAxisName: string, yAxisName: string) => {
  return {
    x: {
      type: 'linear',
      title: {
        display: true,
        text: xAxisName || 'X-axis',
        color: 'black',
        font: {
          size: 20,
          lineHeight: 1.2,
        },
        padding: { top: 18, left: 0, right: 0, bottom: 18 }
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: yAxisName || 'Y-axis',
        color: 'black',
        font: {
          size: 20,
          lineHeight: 1.2,
        },
        padding: { top: 0, left: 0, right: 0, bottom: 18 }
      },
    },
  }
}