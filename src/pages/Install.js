import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Input } from "../components/ui/input"
import { InstallmentTable } from './installment-table'
import { calculateInstallments } from './calculate-installments'

export default function FlexSchedule() {
  const initialState = {
    installments: [],
    numberOfInstallments: '4',
    startDate: '2024-10-15',
    repeatEvery: '3',
    adjustAmount: "don't-adjust",
    totalAmount: 40,
  }

  const [state, setState] = useState(initialState)
  const { installments, numberOfInstallments, startDate, repeatEvery, adjustAmount, totalAmount } = state
  const [savedState, setSavedState] = useState(initialState)

  const totalDonation = installments.reduce((sum, inst) => sum + inst.donation, 0)
  const remainingAmount = totalAmount * 0.25 - totalDonation // Assuming 25% target donation

  useEffect(() => {
    handleAdjustAmounts()
  }, [numberOfInstallments, startDate, repeatEvery, totalAmount, adjustAmount])

  const handleDonationChange = (id, donation) => {
    setState((prevState) => ({
      ...prevState,
      installments: prevState.installments.map(inst =>
        inst.id === id ? { ...inst, donation } : inst
      ),
    }))
  }

  const handleAdjustAmounts = () => {
    let newInstallments = calculateInstallments(
      Number(numberOfInstallments),
      startDate,
      Number(repeatEvery),
      totalAmount
    )

    if (adjustAmount === 'adjust-equally') {
      // Logic for equal adjustment is already in calculateInstallments
    } else if (adjustAmount === 'adjust-last') {
      const lastIndex = newInstallments.length - 1
      const totalWithoutLast = newInstallments.slice(0, -1).reduce((sum, inst) => sum + inst.total, 0)
      newInstallments[lastIndex].total = totalAmount - totalWithoutLast
      newInstallments[lastIndex].donation = newInstallments[lastIndex].total * 0.25
    }
    // 'don't-adjust' doesn't need special handling as it's the default behavior

    setState((prevState) => ({
      ...prevState,
      installments: newInstallments,
    }))
  }

  const handleSaveChanges = () => {
    console.log('Saving changes:', { installments, totalAmount, adjustAmount })
    setSavedState(state) // Save current state as saved state
  }

  const handleDiscardChanges = () => {
    setState(savedState) // Revert to the last saved state
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Flex Schedule</CardTitle>
        <div className="flex gap-4">
          <Button variant="outline">Bulk Edit</Button>
          <Button>+ Add Installment</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Number of installments
            </label>
            <Input
              type="number"
              value={numberOfInstallments}
              onChange={(e) => setState({ ...state, numberOfInstallments: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Starting from
            </label>
            <div className="relative">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setState({ ...state, startDate: e.target.value })}
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Repeat every
            </label>
            <Select value={repeatEvery} onValueChange={(value) => setState({ ...state, repeatEvery: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Adjust amounts
            </label>
            <Select value={adjustAmount} onValueChange={(value) => setState({ ...state, adjustAmount: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select adjustment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="don't-adjust">Don't Adjust</SelectItem>
                <SelectItem value="adjust-equally">Adjust Equally</SelectItem>
                <SelectItem value="adjust-last">Adjust Last</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Total Amount
          </label>
          <Input
            type="number"
            value={totalAmount}
            onChange={(e) => setState({ ...state, totalAmount: Number(e.target.value) })}
          />
        </div>

        <InstallmentTable
          installments={installments}
          onDonationChange={handleDonationChange}
          totalDonation={totalDonation}
          remainingAmount={remainingAmount}
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          * On clicking save, non-paid convenience fee will be adjusted to first non-paid installment.
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleDiscardChanges}>Discard</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
