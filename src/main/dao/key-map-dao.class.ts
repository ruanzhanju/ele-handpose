import path from "path"
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { app } from 'electron'
import { IKeyMap } from "./type"
import uuid from 'uuid'

const {v4: uuidv4} = uuid

const default_db_dir = path.join(app.getAppPath(), 'db')
const default_db_url = path.join(default_db_dir, 'defaultkeyMap.db')
// 对数据文件 提供：增删查改
export class KeyMapDao {
  // 返回所有keymap的list
  public async findAll() {
    if(!existsSync(default_db_url)) {
      await mkdir(default_db_dir, {recursive: true})
      await writeFile(default_db_url, JSON.stringify([]), 'utf-8')
    }
    const content = await readFile(default_db_url, 'utf-8')
    const keyMapList = JSON.parse(content) as IKeyMap[]
    return keyMapList
  }
  // 根据id查找某个keymap
  public async find(id: string){
    const keyMapList = await this.findAll()
    return keyMapList.find(keymap => keymap.id === id)
  }
  // 新增一个keymap
  public async insert(dto: IKeyMap) {
    const keyMapList = await this.findAll()
    dto.id = uuidv4()
    keyMapList.unshift(dto)
    await this.writeback(keyMapList)
  }
  // 根据id删除keymap, 返回删除的个数
  public async remove(id: string) {
    const keyMapList = await this.findAll()
    const newkeyMapList = keyMapList.filter(keymap => {
      return (keymap.notChange) || (keymap.id !== id) // 不能修改或者不是需要删除id的返回留下
    })
    await this.writeback(newkeyMapList)
    return keyMapList.length - newkeyMapList.length
  }
  // 根据keymap.id更新keymap, 跟新成功返回true,否则false
  public async update(dto: IKeyMap){
    const keyMapList = await this.findAll()
    const index = keyMapList.findIndex(keymap => {
      return (!keymap.notChange) && (keymap.id === dto.id)
    })
    if(index < 0) {
      return false
    } else {
      keyMapList.splice(index, 1, dto)
      await this.writeback(keyMapList)
      return true
    }
  }
  // 将文件写回
  private async writeback(list: IKeyMap[]) {
    list = list || []
    await writeFile(default_db_url, JSON.stringify(list), 'utf-8')
  }
}

const keyMapDao = new KeyMapDao()
export default keyMapDao
