// This is a utility function to parse different file formats

export async function parseFile(file: File): Promise<{ data: any[]; columns: string[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const result = event.target?.result as string

        if (file.name.endsWith(".csv")) {
          // Parse CSV
          const { data, columns } = parseCSV(result)
          resolve({ data, columns })
        } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          // For Excel files, we would use a library like xlsx
          // This is a simplified mock implementation
          const { data, columns } = await parseExcel(result)
          resolve({ data, columns })
        } else {
          reject(new Error("Unsupported file format"))
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

function parseCSV(csvText: string): { data: any[]; columns: string[] } {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",").map((header) => header.trim())

  const data = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const values = line.split(",").map((value) => value.trim())
      const row: Record<string, any> = {}

      headers.forEach((header, index) => {
        // Try to convert numeric values
        const value = values[index]
        row[header] = isNaN(Number(value)) ? value : Number(value)
      })

      return row
    })

  return { data, columns: headers }
}

async function parseExcel(content: string): Promise<{ data: any[]; columns: string[] }> {
  // In a real implementation, we would use the xlsx library
  // This is a mock implementation
  return {
    data: [
      { category: "Category A", value: 400, count: 120 },
      { category: "Category B", value: 300, count: 80 },
      { category: "Category C", value: 500, count: 150 },
      { category: "Category D", value: 200, count: 60 },
      { category: "Category E", value: 350, count: 100 },
    ],
    columns: ["category", "value", "count"],
  }
}
