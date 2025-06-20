import { Quest } from "@/entities/guest/model/types"
import { Button } from "@/shared/ui/button"
import { RadioGroup } from "@/shared/ui/radio-group"
import { Text } from "@/shared/ui/text"
import { TextField } from "@/shared/ui/text-field"
import { useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"

interface CreateQuestFormProps {
    tableId: string
    onSubmit: (quest: Quest) => void
}

const initialFormData: Partial<Quest> = {
    name: '',
    age: '',
    side: 'groom',
    gender: 'male'
}

export const CreateQuestForm = ({ tableId, onSubmit }: CreateQuestFormProps) => {

    const [formData, setFormData] = useState(initialFormData)

    const genderButtons = useMemo(() => ([
        {
            id: 'male',
            label: 'Мужчина',
        },
        {
            id: 'female',
            label: 'Женщина',
        }
    ]), []);

    const sideButtons = useMemo(() => ([
        {
            id: 'groom',
            label: 'Жених',
        },
        {
            id: 'bride',
            label: 'Невеста',
        }
    ]), []);

    const hanldeSubmit = () => {
        const quest: Quest = {
            id: `${Date.now()}-${Math.random()}`,
            tableId,
            name: formData.name || '',
            age: formData.age || '',
            side: formData.side || 'groom',
            gender: formData.gender || 'male'
        }
        onSubmit(quest)
    }

    const isFormValid = formData.name && formData.age

    return <View style={styles.form}>
        <Text style={styles.title}>Создайте гостя</Text>
        <TextField
            placeholder="Введите имя гостя"
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextField
            placeholder="Введите возраст гостя"
            style={styles.input}
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            maxLength={3}
        />
        <View style={styles.radioGroup}>
            <Text>Пол гостя</Text>
            <RadioGroup
                radioButtons={genderButtons}
                layout="row"
                selectedId={formData.gender}
                onPress={(gender) => setFormData({ ...formData, gender: gender as 'male' })}
            />
        </View>
        <View style={styles.radioGroup}>
            <Text>Сторона гостя</Text>
            <RadioGroup
                radioButtons={sideButtons}
                layout="row"
                selectedId={formData.side}
                onPress={(side) => setFormData({ ...formData, side: side as 'groom' })}
            />
        </View>
        <Button
            title="Создать"
            onPress={hanldeSubmit}
            disabled={!isFormValid}
        />
    </View>
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    radioGroup: {
        marginBottom: 10,
    }
})