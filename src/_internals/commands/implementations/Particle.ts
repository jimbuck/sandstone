/* eslint-disable no-restricted-globals */
import { LiteralUnion } from '@/generalTypes'
import {
  BLOCKS, Coordinates, ITEMS, PARTICLE_TYPES, SelectorArgument,
} from '@arguments'
import { Command } from '@commands/Command'
import { command } from '@commands/decorators'

type Delta = [number, number, number]

type ParticleCommand = (
  (
    /** Normal case */
    (
    name: Exclude<PARTICLE_TYPES, 'minecraft:dust' | 'minecraft:block' | 'minecraft:falling_dust' | 'minecraft:item'>,
    pos?: Coordinates,
    delta?: Delta,
    speed?: number,
    count?: number,
    mode?: 'force' | 'normal',
    viewers?: SelectorArgument<false>
  ) => void) & (
    /** Dust parameters */
    (
    name: 'minecraft:dust',
    colors: [red: number, green: number, blue: number, size: number],
    pos?: Coordinates,
    delta?: Delta,
    speed?: number,
    count?: number,
    mode?: 'force' | 'normal',
    viewers?: SelectorArgument<false>
  ) => void) & (
    /** Block / falling dust parameters */
    (
    name: 'minecraft:block' | 'minecraft:falling_dust',
    block: LiteralUnion<BLOCKS>,
    pos?: Coordinates,
    delta?: Delta,
    speed?: number,
    count?: number,
    mode?: 'force' | 'normal',
    viewers?: SelectorArgument<false>
  ) => void) & (
    /** Item parameters */
    (
    name: 'minecraft:item',
    item: LiteralUnion<ITEMS>,
    pos?: Coordinates,
    delta?: Delta,
    speed?: number,
    count?: number,
    mode?: 'force' | 'normal',
    viewers?: SelectorArgument<false>
  ) => void)
)

export class Particle extends Command {
  @command('particle', { isRoot: true })
  particle: ParticleCommand = (...args: unknown[]) => {
    this.particle()
  }
}
