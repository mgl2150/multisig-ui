import { useEffect, useContext, useState } from "react"
import { getAccount } from "../../libs/keplrClient"
import { useRouter } from "next/router"
import { ChainContext } from "../Context"
import { openNotification } from "../ulti/Notification"
import SendMsgForm from "./transaction/SendMsg"
import { SettingFilled } from "@ant-design/icons"
import Button from "../input/Button"
import { Select } from "antd"

const { Option } = Select

const TransactionCreate = ({ }) => {
    const [txType, setTxType] = useState(0)
    const router = useRouter()
    const { multisigID } = router.query
    const { chain } = useContext(ChainContext)
    const [account, setAccount] = useState(null)

    const txTypes = [
        {
            type: 'msgSend',
            component: (
                <SendMsgForm
                    chain={chain}
                    router={router}
                    address={multisigID}
                    account={account}
                />
            )
        }, {
            type: 'msgDelegate',
            component: (
                <div>

                </div>
            )
        }
    ]

    useEffect(() => {
        (async () => {
            if (multisigID) {
                try {
                    const account = await getAccount(chain.rpc, multisigID)
                    setAccount(account)
                }
                catch (e) {
                    openNotification('error', e.message)
                }
            }
        })()
    }, [multisigID])

    const getForm = () => {
        return txTypes[txType].component
    }

    return (
        <div
            style={{
                width: '60%',
                margin: 'auto',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em',
                borderRadius: '30px',
                position: 'relative',
            }}
        >
            <h1
                style={{
                    marginBottom: 0,
                    textAlign: 'center'
                }}
            >
                Create Transaction
            </h1>
            <h3>
                Message Type
            </h3>
            <Select
                defaultValue={0}
                placeholder={'Select message type'}
                onChange={(value) => {
                    setTxType(value)
                }}
                style={{
                    marginBottom: '20px',
                    width: '100%',
                    backgroundColor: '#D9D9D9'
                }}
            >
                {txTypes.map((type, index) => {
                    return (
                        <Option
                            key={index}
                            value={index}
                            style={{
                                padding: '1em'
                            }}
                        >
                            {type.type}
                        </Option>
                    )
                })}
            </Select>
            {
                getForm()
            }
        </div>
    )
}

export default TransactionCreate